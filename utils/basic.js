import { ObjectId } from 'mongodb';

const baseUtils = {

  /**
   * Checks if Id is Valid for Mongo
   * @id {string|number} id to be evaluated
   * @return {boolean} true if valid, false if not
   */

  isValid (id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }

    return true;
  }

};

export default baseUtils;
