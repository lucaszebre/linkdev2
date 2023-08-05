export function createLinkArray(userData: any) {
    const linkArray = [];
  
    // Extracting platform and link properties from userData and creating Link objects
    if (userData.github) {
      linkArray.push({ platform: 'github', link: userData.github });
    }
    if (userData.frontend) {
      linkArray.push({ platform: 'frontendmentor', link: userData.frontend });
    }
    if(userData.youtube){
        linkArray.push({ platform: 'youtube', link: userData.youtube });

    }if(userData.twitter){
        linkArray.push({ platform: 'twitter', link: userData.twitter });

    }if(userData.devto){
        linkArray.push({ platform: 'devto', link: userData.devto });

    }if(userData.codewars){
        linkArray.push({ platform: 'codewars', link: userData.codewars });

    }if(userData.facebook){
        linkArray.push({ platform: 'facebook', link: userData.facebook });

    }if(userData.gitlab){
        linkArray.push({ platform: 'gitlab', link: userData.gitlab });

    }if(userData.hashnode){
        linkArray.push({ platform: 'hashnode', link: userData.hashnode });

    }if(userData.twitch){
        linkArray.push({ platform: 'twicht', link: userData.twitch });

    }if(userData.stackoverflow){
        linkArray.push({ platform: 'stackoverflow', link: userData.stackoverflow });

    }if(userData.linkedin){
        linkArray.push({ platform: 'linkedin', link: userData.linkedin });

    }if(userData.freecodecamp){
        linkArray.push({ platform: 'freecodecamp', link: userData.freecodecamp });

    }if(userData.codepen){
        linkArray.push({ platform: 'codepen', link: userData.codepen });

    }
    // Add more conditions for other platform properties as needed
  
    return linkArray;
  }
