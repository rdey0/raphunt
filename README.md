RULES:
- Dont push to `master` branch.
- Dont push to `dev` branch.
- Push to <feature> branch and merge into `dev` branch. Periodically then we will merge the `dev` branch with the `master` branch.
- Do not deploy to production site.
- Deploy to staging site when developing. 

The current production site should ALWAYS be running the code in the `master` branch, it should never be out of sync.

The staging branch could be running the `dev` branch code or a <feature> branches code.

PUSHING PROD INSTRUCTIONS:
https://docs.google.com/document/d/1QftB1LkHH_Tp1MYhK-40VJRei9O0Bp9QIepyUjRxltc/edit?usp=sharing
Includes how to update `master` branch and how to push to deploy.
