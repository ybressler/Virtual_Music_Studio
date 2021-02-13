""" Define Model Classes """

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Teacher(db.Model):
    """Data Model for Teacher IDs"""
    __tablename__ = 'teachers'
    
    teacher_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    teacher_fname = db.Column(db.String(25), nullable=False)
    teacher_lname = db.Column(db.String(25), nullable=False)
    teacher_email = db.Column(db.String(50), nullable=False)
    teacher_phone = db.Column(db.String(25))
    teacher_password = db.Column(db.String(50), nullable=False)

    # user = db.relationship('User', backref='teacher', uselist=False)

    def __repr__(self):
        """Show Teacher ID/Corresponding User Id"""
        return f'<Teacher teacher_id={self.teacher_id} teacher_name={self.teacher_fname} {self.teacher_lname}>'


class Student(db.Model):
    """Data Model for Student-specific Information"""
    __tablename__ = 'students'
    
    student_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    # teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id'), nullable=False)
    student_fname = db.Column(db.String(25), nullable=False)
    student_lname = db.Column(db.String(25), nullable=False)
    student_email = db.Column(db.String(50), nullable=False)
    student_phone = db.Column(db.String(25))
    student_password = db.Column(db.String(50), nullable=False)
    private_teacher = db.Column(db.String(50), nullable=False)
    program_name = db.Column(db.String(50)) 
    instrument = db.Column(db.String(25), nullable=False)

    teacher = db.relationship('Teacher', backref='students')
    # user = db.relationship('User', backref='student', uselist=False)

    def __repr__(self):
        """Show Student ID"""
        return f'<Student student_id={self.student_id} student_name = {self.fname} {self.lname} teacher={self.private_teacher}>'


class Log(db.Model):
    """Data Model for Practice Logs"""
    __tablename__ = 'logs'
    
    log_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    log_date = db.Column(db.String, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    pieces_practiced = db.Column(db.String(150), nullable=False)
    practice_notes = db.Column(db.String(200))

    student = db.relationship('Student', backref='logs')

    def __repr__(self):
        """Show Log Info"""
        return f'<Log log_date={self.log_date} student_id={self.student_id} log_id={self.log_id}'


def connect_to_db(flask_app, db_uri='postgresql:///VMS', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)
    db.create_all()



    # sample_teacher = Teacher(user = User(fname="Teacher", 
    #                                 lname="mcTeachface", 
    #                                 email="yes", 
    #                                 password="no"))

    # sample_student = Student(program_name = "Music class the best", 
    #                             instrument="violin", 
    #                             teacher = sample_teacher,
    #                             user = User(fname="Stuuuwy", 
    #                                 lname="Stoodent", 
    #                                 email="yes", 
    #                                 password="no"))

    # sample_log = Log(student=sample_student,
    #                         log_date="1999-02-04",
    #                         start_time="2:00pm",
    #                         end_time="5:00pm",
    #                         pieces_practiced="Walton Violin Concerto")