module.exports = (email_id, user_id, first_name, person_ref, role,markup) => {
  localStorage.setItem('user_id', user_id);
  localStorage.setItem('email_id', email_id);
  localStorage.setItem('name', first_name);
  localStorage.setItem('person_ref', person_ref);
  localStorage.setItem('role', role);
  localStorage.setItem('markup', markup);
};
