 const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function(knex) {
  return knex("posts")
     .del()
     .then(function() {
    
       const posts = Array.from({length: 100}).map(() => {
         return {
          username: faker.name.firstName(), 
          title: faker.company.catchPhrase(),
           content: faker.lorem.paragraph(),
           image_url: faker.image.imageUrl(),
           view_count: Math.floor(Math.random() * 100),
           created_at: faker.date.past(),
           updated_at: faker.date.past()
         }
       })
       
       return knex('posts').insert(posts)
     })
 };