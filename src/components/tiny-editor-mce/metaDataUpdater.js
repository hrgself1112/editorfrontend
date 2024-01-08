// MetaDataUpdater.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/slices/article-data';
import { Button } from '../ui/button';

const MetaDataUpdater = ({ metas, cleanedContent }) => {
  const dispatch = useDispatch();
  const ArticlesData = useSelector((state) => state.ArticlesData);

  const setMetaAndDataToRedux = () => {
    const { Title, Description, Keywords, URL, H1 } = metas;
    dispatch(
      updateUser({
        ...ArticlesData,
        title: Title,
        description: Description,
        keywords: Keywords,
        url: URL,
        h1: H1,
        content: cleanedContent,
      })
    );
  };

  return <Button onClick={setMetaAndDataToRedux}>Get Title</Button>;
};

export default MetaDataUpdater;
