import { Container } from '@/components/layout/Container';

import { Data } from '@/interfaces/model';

interface NewsListProps {
  posts: Data[];
}

export const NewsList = (props: NewsListProps) => {
  const { posts } = props;
  return (
    <>
      <section className='py-16 md:py-24 lg:py-32'>
        <Container>
          {posts.map((post: Data) => (
            <div key={post.id}>
              <h2>{post.attributes.title}</h2>
              <p>{post.attributes.content}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
};
