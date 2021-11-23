'use strict';

const {v4} = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('products',
      [
        {
          id: v4(),
          name: 'Sendy Audio Peacock',
          image_link: 'https://muzikercdn.com/uploads/products/8269/826929/thumb_d_gallery_base_1243e45b.jpg',
          price: 1499.0
        },
        {
          id: v4(),
          name: 'Pearl River EU118-WP-Biela',
          image_link: 'https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg',
          price: 3775.0
        },
        {
          id: v4(),
          name: 'Yamaha B2E PE Polished Ebony',
          image_link: 'https://muzikercdn.com/uploads/products/239/23976/thumb_39a0fe36.jpg',
          price: 5369.0
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
