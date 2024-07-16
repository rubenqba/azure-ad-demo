import React from 'react'

type AzureUserDataProps = {
    className?: string;
}

function AzureUserData({className}: Readonly<AzureUserDataProps>) {
  return (
    <div className={className}>
      Azure Data
    </div>
  )
}

export default AzureUserData
