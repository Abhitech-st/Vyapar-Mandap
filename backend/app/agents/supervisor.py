import datetime
import uuid
from sqlalchemy.orm import Session
from app.models.models import AgentTask, AgentLog, Notification, AuditLog

class SupervisorAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    def create_task(self, agent_name: str, task_type: str, input_payload: dict) -> AgentTask:
        task = AgentTask(
            id=str(uuid.uuid4()),
            organization_id=self.organization_id,
            agent_name=agent_name,
            task_type=task_type,
            status="Running",
            input_payload=input_payload
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        
        self.log_step(task.id, "Initialization", "INFO", f"Supervisor initialized execution graph for {agent_name} ({task_type})")
        return task

    def log_step(self, task_id: str, step_name: str, level: str, message: str, metadata: dict = None):
        log = AgentLog(
            id=str(uuid.uuid4()),
            agent_task_id=task_id,
            step_name=step_name,
            log_level=level,
            message=message,
            metadata_json=metadata or {}
        )
        self.db.add(log)
        self.db.commit()

    def request_human_approval(self, task_id: str, reason: str, payload: dict) -> AgentTask:
        task = self.db.query(AgentTask).filter(AgentTask.id == task_id).first()
        if task:
            task.status = "Pending_Approval"
            task.output_payload = payload
            self.db.commit()
            
            self.log_step(task_id, "Human Signoff Checkpoint", "WARN", f"Execution halted: {reason}")
            
            # Send notification
            notif = Notification(
                id=str(uuid.uuid4()),
                organization_id=self.organization_id,
                title="AI Human Approval Required",
                message=f"Task {task.agent_name}: {reason}",
                type="Warning",
                action_url=f"/invoices"
            )
            self.db.add(notif)
            self.db.commit()
        return task

    def complete_task(self, task_id: str, output_payload: dict) -> AgentTask:
        task = self.db.query(AgentTask).filter(AgentTask.id == task_id).first()
        if task:
            task.status = "Completed"
            task.output_payload = output_payload
            self.db.commit()
            self.log_step(task_id, "Task Completed", "SUCCESS", f"{task.agent_name} pipeline finished successfully.")
        return task
