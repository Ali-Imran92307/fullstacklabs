export function updateStudentProfile(student, update, ...auditLabels) {
  const { address: oldAddress = {}, contact: oldContact = {}, ...studentFields } = student;
  const { address: addressUpdate = {}, contact: contactUpdate = {}, ...fieldUpdates } = update ?? {};
  const { city: oldCity = 'Unknown' } = oldAddress;
  const { city: newCity = oldCity } = addressUpdate;
  const { email: oldEmail = '', ...oldContactRest } = oldContact;
  const { email: newEmail = oldEmail, ...newContactRest } = contactUpdate;
  const [primaryAudit = 'profile-update', ...remainingAudit] = auditLabels;
  const address = { ...oldAddress, ...addressUpdate, city: newCity };
  const contact = { email: newEmail, ...oldContactRest, ...newContactRest };
  const { name = 'Unnamed', marks = 0, scholarship = false } = { ...studentFields, ...fieldUpdates };
  return {
    ...studentFields, ...fieldUpdates, name, marks, scholarship, address, contact,
    audit: { primaryAudit, remainingAudit },
    displayCity: address?.city ?? 'Unknown'
  };
}

export function runProfileDemo() {
  const student = { id: 101, name: 'Ali', marks: 0, scholarship: false, address: { city: 'Islamabad', sector: 'F-10' }, contact: { email: 'ali@university.edu' } };
  const update = { name: 'Ali Khan', address: { city: 'Rawalpindi' }, contact: { phone: '03001234567' }, marks: 0, scholarship: false };
  const updated = updateStudentProfile(student, update, 'manual', 'registrar');
  console.log('\nTask 3 profile:', { updated, originalUnchanged: student.name === 'Ali' && student.address.city === 'Islamabad', references: { student: student === updated, address: student.address === updated.address, contact: student.contact === updated.contact } });
}
