import React, { useEffect, useState } from 'react';
import { getLinkedinPost } from '@/libs/api'

const LinkedInPostDetails = () => {
    const [postImage, setPostImage] = useState('');
    const [postCaption, setPostCaption] = useState('');
    const postUrl = 'YOUR_LINKEDIN_POST_URL_HERE';

    useEffect(() => {
        const fetchPostDetails = async () => {
           
                // Use the LinkedIn API to fetch post details
                const response = await getLinkedinPost()

                // Extract image and captions from the retrieved post details
                if (response.data.elements.length > 0) {
                    const post = response.data.elements[0];

                    if (post.hasOwnProperty('content')) {
                        if (post.content.hasOwnProperty('contentEntities')) {
                            const contentEntities = post.content.contentEntities;

                            // Find images and captions in content entities
                            contentEntities.forEach(entity => {
                                if (entity.hasOwnProperty('thumbnails')) {
                                    setPostImage(entity.thumbnails[0].resolvedUrl);
                                }
                                if (entity.hasOwnProperty('text')) {
                                    setPostCaption(entity.text);
                                }
                            });
                        }
                    }
                }
            
        };

        fetchPostDetails();
    }, []);

    return (
        <div>
            <h1>LinkedIn Post Details</h1>
            {postImage && (
                <div>
                    {/* Display the post image */}
                    <img src={postImage} alt="LinkedIn Post" />
                </div>
            )}
            {postCaption && (
                <div>
                    {/* Display the post caption */}
                    <p>{postCaption}</p>
                </div>
            )}
        </div>
    );
};

export default LinkedInPostDetails;
