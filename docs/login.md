# Login
> These accounts is hardcoded in.

| Username          | Password           |
| ----------------- | ------------------ |
| testuser1         | testuser1          |
| testuser2         | testuser2          |

The user accounts is found at this [location](../backend/src/database/users.ts).
The best way is to use your own database for user logins instead of using the hardcoded one.

The passwords is hashed using bcrypt. 
