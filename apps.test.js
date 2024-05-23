<script type="module">
import { createUser } from './apps.js';
</script>
// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  set: jest.fn(),
  ref: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
    user: { uid: 'testUid' }
  })),
}));

describe('createUser', () => {
  it('should reject if any field is missing', () => {
    return expect(createUser('', '', '', '', '', false)).rejects.toThrow('All fields are required');
  });

  it('should create user successfully', () => {
    return expect(createUser('test@example.com', 'password123', 'Test User', '25', '1234567890', false))
      .resolves.toBe('User created');
  });

  it('should throw error if createUserWithEmailAndPassword fails', () => {
    require('firebase/auth').createUserWithEmailAndPassword.mockImplementationOnce(() => 
      Promise.reject(new Error('Firebase error'))
    );

    return expect(createUser('test@example.com', 'password123', 'Test User', '25', '1234567890', false))
      .rejects.toThrow('Firebase error');
  });
});
