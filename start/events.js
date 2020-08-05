/** @type {typeof import('@adonisjs/framework/src/Event/Manager')} */
const Event = use('Event');


Event.on('new::user', 'User.registered')
