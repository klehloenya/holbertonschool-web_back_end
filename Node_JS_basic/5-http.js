const http = require('http');
const fs = require('fs').promises;
const path = require('path');

function countStudents(filePath) {
  return fs.readFile(path.resolve(filePath), 'utf8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      const studentLines = lines.slice(1);
      const students = studentLines.map(line => line.split(','));
      
      let output = `Number of students: ${students.length}\n`;
      
      const fieldsMap = {};
      students.forEach(student => {
        const field = student[3];
        if (!fieldsMap[field]) {
          fieldsMap[field] = [];
        }
        fieldsMap[field].push(student[0]);
      });
      
      for (const [field, studentNames] of Object.entries(fieldsMap)) {
        output += `Number of students in ${field}: ${studentNames.length}. List: ${studentNames.join(', ')}\n`;
      }
      
      return output.trim();
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      // Get database path from command line arguments
      const dbPath = process.argv[2];
      
      if (!dbPath) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }
      
      const studentsInfo = await countStudents(dbPath);
      res.end(`This is the list of our students\n${studentsInfo}`);
    } catch (error) {
      res.end(`This is the list of our students\n${error.message}`);
    }
  }
});

app.listen(1245, () => {
  console.log('Server running on port 1245');
});

module.exports = app;
