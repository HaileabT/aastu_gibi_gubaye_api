import {Router} from 'express';
import {
  createStudent,
  deleteStudent,
  getStudents,
  getOneStudent,
  updateStudent,
  getLogedInPerson,
  downloadStudentSpreadsheet,
} from '../controllers/student.controller';
import {
  AddAdminAndSuperAdmin,
  authenticateJWT,
  authorizeAdmin,
  RegisterAuthorizer,
} from '../middlewares/auth.middleware';
import {LogIn} from '../controllers/login.controller';
import {getStatsStudents} from '../controllers/student.controller';

const router = Router();

router
  .route('/')
  .get(authenticateJWT, authorizeAdmin, getStudents)
  .post(
    authenticateJWT,
    RegisterAuthorizer,
    AddAdminAndSuperAdmin,
    createStudent
  );

router.route('/download-spreadsheet').get(downloadStudentSpreadsheet);
router
  .route('/:id')
  .get(getOneStudent)
  .delete(authenticateJWT, authorizeAdmin, deleteStudent)
  .put(authenticateJWT, authorizeAdmin, updateStudent);

router.route('/logedin/person').get(authenticateJWT, getLogedInPerson);
router.route('/stats/studentdata').get(getStatsStudents);

router.route('/login').post(LogIn);

export const studentRouter = router;
