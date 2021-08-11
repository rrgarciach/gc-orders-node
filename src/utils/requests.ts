export function ok(responseObject) {
  let body = {};
  try {
    body = JSON.stringify(responseObject);
  } catch (err) {
    console.error(err);
  }
  return {
    statusCode: 200,
    body,
  }
}
