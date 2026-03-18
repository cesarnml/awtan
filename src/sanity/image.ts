import {createImageUrlBuilder} from "@sanity/image-url";

import { sanityClient } from "./client";
import type { CMSImage } from "./types";

const builder = createImageUrlBuilder(sanityClient);

export function getImageUrl(image: CMSImage | undefined, width = 1600) {
  if (!image) {
    return undefined;
  }

  if ("url" in image) {
    return image.url;
  }

  if (!image.asset?._ref) {
    return undefined;
  }

  return builder.image(image).width(width).fit("crop").auto("format").url();
}
