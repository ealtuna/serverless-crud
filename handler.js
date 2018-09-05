const bootstrap = require('./lib/bootstrap');
const Member = require('./models/member');

require('dotenv').config({ path: './variables.env' });

module.exports.create = async (event, context) => {
  try{
    await bootstrap();
    const member = await (new Member(JSON.parse(event.body))).save();
    return {
      statusCode: 200,
      body: JSON.stringify(member),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not create the member.'
    };
  }
}

module.exports.getOne = async (event, context) => {
  try {
    await bootstrap();
    const member = await Member.findOne({ _id: event.pathParameters.id });
    if (!member) {
      return { statusCode: 404, body: 'Not found' };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(member),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not fetch the member.'
    };
  }
}

module.exports.getAll = async (event, context) => {
  try {
    await bootstrap();
    const members = await Member.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(members),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not fetch the members.'
    };
  }
}

module.exports.update = async (event, context) => {
  try {
    await bootstrap();
    const member = await Member.findOneAndUpdate(
      { _id: event.pathParameters.id },
      JSON.parse(event.body),
      { new: true },
    );
    if (!member) {
      return { statusCode: 404, body: 'Not found' };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(member),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not update the member.'
    };
  }
}

module.exports.delete = async (event, context) => {
  try {
    await bootstrap();
    const member = await Member.findOneAndRemove({ _id: event.pathParameters.id });
    if (!member) {
      return { statusCode: 404, body: 'Not found' };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(member),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not remove the member.'
    };
  }
}
