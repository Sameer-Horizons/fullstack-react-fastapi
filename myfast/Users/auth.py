import jwt
from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash,exceptions

password_hash = PasswordHash.recommended()

class Auth:
    SECRET_KEY = "your-very-secret-key" 
    ALGORITHM = "HS256"

    @staticmethod
    def hash_pass(password: str) -> str:
        return password_hash.hash(password)

    @staticmethod
    def verify_pass(plain_password: str, hashed_password: str) -> bool:
        return password_hash.verify(plain_password, hashed_password)

    def create_token(self, admin_id: str):
        payload = {
            "sub": str(admin_id),
            "exp": datetime.now(timezone.utc) + timedelta(days=7)
        }
        return jwt.encode(payload, self.SECRET_KEY, algorithm=self.ALGORITHM)

auth = Auth()
