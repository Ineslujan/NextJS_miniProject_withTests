import api from './api';
import { PostType, UserType } from '../interfaces/interfaces';

type CategoryType = 'posts' | 'users';

const getDatas = async <T extends PostType | UserType>(
  category: CategoryType, id?: number,
): Promise<T[] | null> => {
  try {
    const fetchDatas = await (await fetch(`${api}${category}${id ? `/${id}` : ''}`)).json();

    return fetchDatas;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getDatas;
