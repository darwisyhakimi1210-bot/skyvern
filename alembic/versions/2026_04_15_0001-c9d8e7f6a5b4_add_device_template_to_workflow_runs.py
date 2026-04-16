"""add_device_template_to_workflow_runs

Revision ID: c9d8e7f6a5b4
Revises: f7bf5845eafb
Create Date: 2026-04-15T00:01:00.000000+00:00

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c9d8e7f6a5b4"
down_revision: Union[str, None] = "f7bf5845eafb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("workflow_runs", sa.Column("device_template", sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column("workflow_runs", "device_template")
