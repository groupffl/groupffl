export const BEGIN_SPINNER = 'BEGIN_SPINNER';
export const END_SPINNER = 'END_SPINNER';

export function beginSpinner() {
  return {
    type: BEGIN_SPINNER,
    payload: true
  };
}

export function endSpinner() {
  return {
    type: END_SPINNER,
    payload: false
  };
}
