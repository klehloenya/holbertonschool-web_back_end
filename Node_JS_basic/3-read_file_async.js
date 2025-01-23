const fs = require('fs').promises;
const path = require('path');

function countStudents(filePath) {
  return fs.readFile(path.resolve(filePath), 'utf8')
    .then((data) => {
      // Split the data into lines and filter out empty lines
      const lines = data.split('\n').filter(line => line.trim() !== '');
      
      // Remove the header line
      const studentLines = lines.slice(1);
      
      // Process students
      const students = studentLines.map(line => line.split(','));
      
      // Log total number of students
      console.log(`Number of students: ${students.length}`);
      
      // Group students by field
      const fieldsMap = {};
      students.forEach(student => {
        const field = student[3];
        if (!fieldsMap[field]) {
          fieldsMap[field] = [];
        }
        fieldsMap[field].push(student[0]);
      });
      
      // Log details for each field
      for (const [field, studentNames] of Object.entries(fieldsMap)) {
        console.log(`Number of students in ${field}: ${studentNames.length}. List: ${studentNames.join(', ')}`);
      }
      
      return students.length;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
