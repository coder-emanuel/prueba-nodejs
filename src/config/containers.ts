import {UserService} from '../services/userServices';
import { container } from 'tsyringe';
import {UserRepository} from '../repositories/userRepository';

container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);