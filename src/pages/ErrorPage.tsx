import { useRouteError } from "react-router-dom";

interface RouteError extends Error {
    statusText: string;
    message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page" className="text-center pt-14">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-xl py-6">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}