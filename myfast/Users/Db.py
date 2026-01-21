from sqlalchemy import create_engine
from sqlalchemy.orm  import declarative_base,sessionmaker

db_connetion_pg = "postgresql://postgres:2002@localhost/emp"
engine = create_engine(db_connetion_pg)

SessionLocal = sessionmaker(bind = engine, autocommit=False , autoflush=False)
Base = declarative_base()