import React from 'react'

type ShowTokenProps = {
  title: string;
  token?: string;
}

const ShowToken = ({title, token}: Readonly<ShowTokenProps>) => {
  return (
    <div className="flex flex-col mt-4">
      <strong>{title}:</strong>
      <pre className="mt-2 whitespace-normal break-words">
        {token}
      </pre>
    </div>
  );
}

export default ShowToken
