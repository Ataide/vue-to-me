import firebase from '../firebase/index';

const db = firebase.collection("rooms");

class RoomService {
  getAll() {
    return db;
  }

  create(room) {
    return db.add(room);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new RoomService();