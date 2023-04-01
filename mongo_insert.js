const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://talal_ahmed:talal_ahmed@cluster1.i3wda6k.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const db_name = "Task4"

// Define the schema for the author collection
const authorSchema = {
  _id: { type: 'ObjectId', auto: true },
  first_name: { type: 'string' },
  last_name: { type: 'string' },
  date_of_birth: { type: 'date' }
};

// Define the schema for the user collection
const userSchema = {
  _id: { type: 'ObjectId', auto: true },
  username: { type: 'string' },
  password: { type: 'string' },
  active: { type: 'boolean' },
  addresses: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zip: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' }
      }
    }
  },
  date_of_creation: { type: 'date' }
};

// Define the schema for the book collection
const bookSchema = {
  _id: { type: 'ObjectId', auto: true },
  title: { type: 'string' },
  author: {
    type: 'object',
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' }
    }
  },
  isbn: { type: 'string' },
  publishers: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        date: { type: 'date' },
        addresses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              zip: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' }
            }
          }
        }
      }
    }
  },
  available: { type: 'boolean' },
  ages: { type: 'string' },
  summary: { type: 'string' },
  subjects: { type: 'array', items: { type: 'string' } },
  notes: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        user: { type: 'string' },
        note_body: { type: 'string' },
        language: { type: 'string' }
      }
    }
  }
};



function run() {
  const database = client.db(db_name);
  const author = database.collection('AUTHOR');
  const user = database.collection('USER');
  const book = database.collection('BOOK');

console.log("Connected to database");

  author.insertMany([
    {
      "first_name": "Jane",
      "last_name": "Austen",
      "date_of_birth": new Date("1775-12-16")
    },
    {
      "first_name": "J.K.",
      "last_name": "Rowling",
      "date_of_birth": new Date("1965-07-31")
    },
    {
      "first_name": "Agatha",
      "last_name": "Christie",
      "date_of_birth": new Date("1890-09-15")
    }
  ]).then(result => console.log(result));

  user.insertMany([
    {
      "username": "johnsmith",
      "password": "password123",
      "active": true,
      "addresses": [
        {
          "street": "123 Main St",
          "city": "Boston",
          "zip": "02108",
          "state": "MA",
          "country": "USA"
        }
      ],
      "date_of_creation": new Date("2022-01-01")
    },
    {
      "username": "janedoe",
      "password": "password456",
      "active": false,
      "addresses": [
        {
          "street": "456 Elm St",
          "city": "New York",
          "zip": "10001",
          "state": "NY",
          "country": "USA"
        },
        {
          "street": "789 Oak St",
          "city": "Los Angeles",
          "zip": "90001",
          "state": "CA",
          "country": "USA"
        }
      ],
      "date_of_creation": new Date("2022-03-15")
    }
  ]).then(result => console.log(result));
  
  book.insertMany([
    {
      title: 'The Catcher in the Rye',
      author: {
        first_name: 'J.K.',
        last_name: 'Rowling'
      },
      isbn: '9780316769174',
      publishers: [
        {
          name: 'Little, Brown and Company',
          date: new Date('1991-05-01'),
          addresses: [
            {
              street: '1290 Avenue of the Americas',
              city: 'New York',
              zip: '10104',
              state: 'NY',
              country: 'USA'
            }
          ]
        }
      ],
      available: true,
      ages: 'Young Adult',
      summary: 'The Catcher in the Rye is a novel by J.D. Salinger that was first published in 1951. It tells the story of Holden Caulfield, a teenage boy who has been expelled from his prep school.',
      subjects: ['Fiction', 'Coming-of-age story'],
      notes: [
        {
          user: 'janedoe',
          note_body: 'Great read, would definitely recommend!',
          language: 'English'
        }
      ]
    },
    {
      title: 'To Kill a Mockingbird',
      author: {
        first_name: 'Jane',
        last_name: 'Austen'
      },
      isbn: '9780061120084',
      publishers: [
        {
          name: 'HarperCollins',
          date: new Date('2006-06-01'),
          addresses: [
            {
              street: '195 Broadway',
              city: 'New York',
              zip: '10007',
              state: 'NY',
              country: 'USA'
            }
          ]
        }
      ],
      available: true,
      ages: 'Young Adult',
      summary: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It is set in the Deep South and explores themes of racism, prejudice, and social injustice.',
      subjects: ['Fiction', 'Historical fiction'],
      notes: [
        {
          user: 'janedoe',
          note_body: 'One of my all-time favorites!',
          language: 'English'
        },
        {
          user: 'jognsmith',
          note_body: 'Excellent book, highly recommend!',
          language: 'English'
        }
      ]
    }
  ]).then(result => console.log(result));


  // perform actions on the collection object
  client.close();
}

run();
