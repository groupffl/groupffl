export default function({ dispatch }) {
  return next => action => {
    // If action does not have a payload
    // or, the payload does not have a .then property
    // we dont care about it, send it on.
    console.log(action);
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // Create a new action with the old type, but
        // replace the promise with the response data
        console.log(response);
        console.log( action );
        const newAction = { action, type: action.type, payload: response };
        dispatch(newAction);
      });
  };
}
