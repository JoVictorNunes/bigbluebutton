export function tsToHHmmss(ts) {
  return (new Date(ts).toISOString().substr(11, 8));
}

export const p = '';
