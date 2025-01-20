import { Linking } from "react-native";

const handleSocialMediaPress = async (platform: string, username: string) => {
  const platformLinks: Record<string, { appUrl: string; webUrl: string }> = {
    instagram: {
      appUrl: `instagram://user?username=${username}`,
      webUrl: `https://instagram.com/${username}`,
    },
    facebook: {
      appUrl: `fb://profile/${username}`, // Works for profile IDs
      webUrl: `https://facebook.com/${username}`,
    },
    soundcloud: {
      appUrl: `soundcloud://users/${username}`, // Adjust for SoundCloud user ID
      webUrl: `https://soundcloud.com/${username}`,
    },
    twitter: {
      appUrl: `twitter://user?screen_name=${username}`,
      webUrl: `https://x.com/${username}`,
    },
    youtube: {
      appUrl: `youtube://www.youtube.com/channel/${username}`, // For YouTube Channel ID
      webUrl: `https://youtube.com/${username}`,
    },
    spotify: {
      appUrl: `spotify://user/${username}`, // For Spotify user IDs
      webUrl: `https://open.spotify.com/user/${username}`,
    },
    residentadvisor: {
      appUrl: `ra://profile/${username}`, // Hypothetical RA deep link scheme
      webUrl: `https://ra.co/dj/${username}`,
    },
  };

  const { appUrl, webUrl } = platformLinks[platform] || {};
  if (!appUrl || !webUrl) {
    console.error(`Unsupported platform: ${platform}`);
    return;
  }

  const supported = await Linking.canOpenURL(appUrl);
  if (supported) {
    await Linking.openURL(appUrl);
  } else {
    await Linking.openURL(webUrl);
  }
};

export { handleSocialMediaPress };
