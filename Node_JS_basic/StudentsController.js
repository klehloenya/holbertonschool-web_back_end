import readDatabase from '../utils.js';

class StudentsController {
  static getAllStudents(req, res) {
    const databasePath = process.argv[2];
    
    readDatabase(databasePath)
      .then(students => {
        let response = 'This is the list of our students\n';
        
        // Sort fields alphabetically (case-insensitive)
        const sortedFields = Object.keys(students).sort((a, b) => 
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
        
        sortedFields.forEach(field => {
          const studentList = students[field];
          response += `Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}\n`;
        });
        
        res.status(200).send(response.trim());
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const databasePath = process.argv[2];
    
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    
    readDatabase(databasePath)
      .then(students => {
        const studentList = students[major] || [];
        res.status(200).send(`List: ${studentList.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
