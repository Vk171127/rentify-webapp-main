export const zodErrorHandler = (issues: any[]) => {
    let errorMessage = "";
    issues.forEach((issue) => {
      errorMessage =
        errorMessage + issue.path.at(0) + ": " + issue.message + ". ";
    });
    console.log(issues);
    return errorMessage;
  };
  