/*
 * Mirage JS guide on Routes: https://miragejs.com/docs/route-handlers/functions
 */

export default function routes() {
  this.namespace = 'api';
  this.passthrough('https://ap-web-1.agora.io/api/v1');
  this.passthrough('https://ap-web-2.agora.io/api/v1');
  this.passthrough('https://ap-web-3.agora.io/api/v1');
  this.passthrough('https://ap-web-4.agora.io/api/v1');
  this.passthrough('https://web-1.ap.sd-rtn.com/api/v1');
  this.passthrough('https://web-2.ap.sd-rtn.com/api/v1');
  this.passthrough('https://web-3.ap.sd-rtn.com/api/v1');
  this.passthrough('https://web-4.ap.sd-rtn.com/api/v1');
  /*
   * A resource comprises all operations for a CRUD
   * operation. .get(), .post(), .put() and delete().
   * Mirage JS guide on Resource: https://miragejs.com/docs/route-handlers/shorthands#resource-helper
   */
  this.resource('users');
  this.resource('products');
  // this.resource('rooms');

  /*
   * From your component use fetch('api/messages?userId=<a user id>')
   * replacing <a user id> with a real ID
   */
  this.get('messages', (schema, request) => {
    const {
      queryParams: { userId },
    } = request;

    return schema.messages.where({ userId });
  });

  this.post('rooms', (schema, request) => {
    const body = JSON.parse(request.requestBody);
    return schema.rooms.create(body)
  })

  this.get('rooms', (schema, request) => {
    return schema.rooms.all()
  })
}
