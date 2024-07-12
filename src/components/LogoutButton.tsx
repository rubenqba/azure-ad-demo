import React from 'react'

type LogoutButtonProps = {
  tenant: string;
  flowName: string;
  redirectUrl: string;
  className?: string;
}
const LogoutButton = ({ tenant, flowName, redirectUrl, className }: Readonly<LogoutButtonProps>) => {
  return (
    <div className={className}>
      <a
        href={`https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${flowName}/oauth2/v2.0/logout?post_logout_redirect_uri=${redirectUrl}/auth/signout`}
      >
        <button className="text-white">Logout</button>
      </a>
    </div>
  );
}

export default LogoutButton
