import * as React from 'react';
import styles from './boardCard.module.scss';
import Image from '../image/image';
import Spacer from '../spacer';
import ProfilePic from '../profilePic/profilePic';
import { Link } from 'react-router-dom';

const BoardCard = ({ board }: { board: any }) => {
  return (
    <Link className={styles.card} to="/">
      <Image src={board.cover_photo_url} />
      <Spacer top="0.75em" bottom="1.2em" left="0" right="0">
        <h2 className={styles.heading}>{board.title}</h2>
      </Spacer>
      <div className={styles.members}>
        <Spacer top="0" left="0" right="0.5em" bottom="0">
          <ProfilePic
            size={{ width: 30, height: 30 }}
            src={board.creator.profile_photo_url || board.creator.gravatar_url}
          />
        </Spacer>
        {board.members.map((member: any) => (
          <Spacer top="0" left="0" right="0.5em" bottom="0">
            <ProfilePic
              size={{ width: 30, height: 30 }}
              src={member.profile_photo_url || member.gravatar_url}
            />
          </Spacer>
        ))}
      </div>
    </Link>
  );
};

export default BoardCard;
