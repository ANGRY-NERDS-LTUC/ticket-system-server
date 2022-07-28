'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      let newRecord = await this.model.create(data);
      return newRecord;
    } catch (err) {
      throw new Error(err, 'Error creating record');
    }
  }

  async get(id) {
    try {
      let record = await this.model.findOne({
        where: {
          id: id
        }
      });
      return record;
    } catch (err) {
      throw new Error(err, 'Error getting record');
    }
  }


  async getAll(id) {
    if (id) {
      console.log("yyyyyyyyyyyyyyyyyyyyyy");
      try {
        let records = await this.model.findAll({
          where: {
            clientId: id
          }
        });
        return records;
      } catch (err) {
        throw new Error(err, 'Error getting all records');
      }
    } else {
      try {
        let records = await this.model.findAll();
        return records;
      } catch (err) {
        throw new Error(err, 'Error getting all records');
      }
    }
  }

  async update(id, data) {
    try {
      let record = await this.model.update(data, {
        where: {
          id: id
        }
      });
      return record;
    } catch (err) {
      throw new Error(err, 'Error updating record');
    }
  }

  async delete(id) {
    try {
      let record = await this.model.destroy({
        where: {
          id: id
        }
      });
      return record;
    } catch (err) {
      throw new Error(err, 'Error deleting record');
    }
  }
}

module.exports = Collection;