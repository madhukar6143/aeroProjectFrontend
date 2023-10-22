const handleErrors = (error, addToast) => {
  
    if (error.response.status) {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismissTimeout: 1000,
    })}
     else {
      addToast(error.message, {
        appearance: "error",
        autoDismissTimeout: 1000,
      });
    }
  };
  
  export default handleErrors;
  
