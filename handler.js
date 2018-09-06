const uuid = require('uuid');
const MemberModel = require('./model/member');

module.exports.create = async (event) => {
  try {
    const memberInfo = JSON.parse(event.body);
    const memberId = uuid.v4();
    const createdMember = await MemberModel.upsert(memberId, memberInfo);
    return {
      statusCode: 200,
      body: JSON.stringify(createdMember),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not create the member.',
    };
  }
};

module.exports.getOne = async (event) => {
  try {
    const member = await MemberModel.get(event.pathParameters.id);
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
      body: 'Could not fetch the member.',
    };
  }
};

module.exports.getAll = async () => {
  try {
    const members = await MemberModel.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify(members),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not fetch the members.',
    };
  }
};

/**
 * In a real world application you may need the support for update
 * specific fields. In this example its assumed you are going to
 * update always all the fields.
 */
module.exports.update = async (event) => {
  try {
    if (!await MemberModel.get(event.pathParameters.id)) {
      return { statusCode: 404, body: 'Not found' };
    }
    const memberInfo = JSON.parse(event.body);
    const upsertedMember = await MemberModel.upsert(event.pathParameters.id, memberInfo);
    return {
      statusCode: 200,
      body: JSON.stringify(upsertedMember),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not update the member.',
    };
  }
};

module.exports.delete = async (event) => {
  try {
    const memberToDelete = await MemberModel.get(event.pathParameters.id);
    if (!memberToDelete) {
      return { statusCode: 404, body: 'Not found' };
    }
    await MemberModel.delete(event.pathParameters.id);
    return {
      statusCode: 200,
      body: JSON.stringify(memberToDelete),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: 'Could not remove the member.',
    };
  }
};
