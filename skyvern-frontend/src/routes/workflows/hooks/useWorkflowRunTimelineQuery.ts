import { getClient } from "@/api/AxiosClient";
import { useCredentialGetter } from "@/hooks/useCredentialGetter";
import {
  statusIsNotFinalized,
  statusIsRunningOrQueued,
} from "@/routes/tasks/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { WorkflowRunTimelineItem } from "../types/workflowRunTypes";
import { useWorkflowRunWithWorkflowQuery } from "./useWorkflowRunWithWorkflowQuery";
import { useGlobalWorkflowsQuery } from "./useGlobalWorkflowsQuery";
import { useFirstParam } from "@/hooks/useFirstParam";

function useWorkflowRunTimelineQuery() {
  const workflowRunId = useFirstParam("workflowRunId", "runId");
  const credentialGetter = useCredentialGetter();
  const { data: globalWorkflows } = useGlobalWorkflowsQuery();
  const { data: workflowRun } = useWorkflowRunWithWorkflowQuery();
  const workflow = workflowRun?.workflow;
  const workflowPermanentId = workflow?.workflow_permanent_id;

  // Previously this hook invalidated the query via a useEffect on `dataUpdatedAt`.
  // Because 11 components call this hook, 11 useEffects would fire invalidations in
  // slightly different render cycles, producing 3+ concurrent network requests per
  // refresh. The backend was serving three identical ~10s timeline queries in parallel.
  // Native refetchInterval is owned by a single query instance, so react-query will
  // only ever have one request in flight no matter how many components subscribe.
  return useQuery<Array<WorkflowRunTimelineItem>>({
    queryKey: ["workflowRunTimeline", workflowPermanentId, workflowRunId],
    queryFn: async () => {
      const client = await getClient(credentialGetter);
      const isGlobalWorkflow = globalWorkflows?.some(
        (workflow) => workflow.workflow_permanent_id === workflowPermanentId,
      );
      const params = new URLSearchParams();
      if (isGlobalWorkflow) {
        params.set("template", "true");
      }
      return client
        .get(
          `/workflows/${workflowPermanentId}/runs/${workflowRunId}/timeline`,
          { params },
        )
        .then((response) => response.data);
    },
    refetchInterval: (query) => {
      if (!query.state.data || !workflowRun) {
        return false;
      }
      // Match the workflow run query's 5s cadence while the run is live.
      return statusIsRunningOrQueued(workflowRun) ? 5000 : false;
    },
    refetchIntervalInBackground: false,
    placeholderData: keepPreviousData,
    refetchOnMount:
      workflowRun && statusIsNotFinalized(workflowRun) ? "always" : false,
    refetchOnWindowFocus:
      workflowRun && statusIsNotFinalized(workflowRun) ? "always" : false,
    enabled: !!globalWorkflows && !!workflowPermanentId && !!workflowRunId,
  });
}

export { useWorkflowRunTimelineQuery };
