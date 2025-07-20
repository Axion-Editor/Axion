import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground select-none">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-accent mb-4">Oops! Page not found</p>
        <Button className="cursor-pointer" variant="outline" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          If you think this is an error, please contact support.
        </p>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        Current Path: {location.pathname}
      </div>
    </div>
  );
};

export default NotFound;
