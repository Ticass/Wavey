import React from "react";
import UserProfileCard from "./userProfileCard";  // Please ensure the correct case is used in your imports
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    Link,
} from '@chakra-ui/react';

const UserProfilePopOver = ({ profile_picture, name, description, tags }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Link fontWeight="bold" color="blue.500">
                    {name}
                </Link>
            </PopoverTrigger>
            <PopoverContent maxW={{ md: '540px' }}>
                <PopoverArrow />
                <PopoverBody>
                    <UserProfileCard
                        name={name}
                        profile_picture={profile_picture}
                        description={description}
                        tags={tags}
                    />
                </PopoverBody>
                <PopoverCloseButton />
            </PopoverContent>
        </Popover>
    )
}

export default UserProfilePopOver;
