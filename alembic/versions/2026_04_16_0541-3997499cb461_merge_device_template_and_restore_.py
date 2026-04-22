"""merge device_template and restore_include_extracted_text migrations

Revision ID: 3997499cb461
Revises: c9d8e7f6a5b4, c9005bafa5ec
Create Date: 2026-04-16 05:41:53.408890+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3997499cb461'
down_revision: Union[str, None] = ('c9d8e7f6a5b4', 'c9005bafa5ec')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
