const dynamodb = require('./lib/dynamodb');
const uuid = require('uuid');
const memberController = require('./controller/member');

module.exports.create = async (event, context) => {
  try{
    const memberInfo = JSON.parse(event.body);
    const memberId = uuid.v4();
    const createdMember = await memberController.upsert(memberId, memberInfo);
    return {
      statusCode: 200,
      body: JSON.stringify(createdMember),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not create the member.'
    };
  }
}

module.exports.getOne = async (event, context) => {
  try {
    const member = await memberController.get(event.pathParameters.id);
    if (!member) {
      return { statusCode: 404, body: 'Not found' };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(member),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not fetch the member.'
    };
  }
}

module.exports.getAll = async (event, context) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    };
    const result = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not fetch the members.'
    };
  }
}

module.exports.update = async (event, context) => {
  try {
    if (! await memberController.get(event.pathParameters.id)) {
      return { statusCode: 404, body: 'Not found' };
    }
    const memberInfo = JSON.parse(event.body);
    const upsertedMember = await memberController.upsert(event.pathParameters.id, memberInfo);
    return {
      statusCode: 200,
      body: JSON.stringify(upsertedMember),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not update the member.'
    };
  }
}

module.exports.delete = async (event, context) => {
  try {
    const memberToDelete = await memberController.get(event.pathParameters.id);
    if (!memberToDelete) {
      return { statusCode: 404, body: 'Not found' };
    }
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
    };
    await dynamodb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(memberToDelete),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not remove the member.'
    };
  }
}
