const fs = require('fs');

function countStudents(path) {
  try {
    // Read file synchronously
    const data = fs.readFileSync(path, 'utf8');
    
    // Split file into lines and filter out empty lines
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    // Remove header
    const students = lines.slice(1);
    
    // Log total number of students
    console.log(`Number of students: ${students.length}`);
    
    // Group students by field
    const fieldGroups = {};
    students.forEach(student => {
      const [firstname, , , field] = student.split(',');
      if (!fieldGroups[field]) {
        fieldGroups[field] = [];
      }
      fieldGroups[field].push(firstname);
    });
    
    // Log students in each field
    Object.keys(fieldGroups).forEach(field => {
      console.log(`Number of students in ${field}: ${fieldGroups[field].length}. List: ${fieldGroups[field].join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
