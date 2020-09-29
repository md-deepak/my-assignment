import React, { Fragment } from "react";
import { StoryWrapper, StoryTitle, StoryMeta, StoryMetaElement, ButtonElement } from "../styles/StoryStyles"; // import Style Component
import { mapTime } from "../mappers/mapTime"; // import time mapper component
export const NewsListComponent = ({ newes, deleteAction }) => {
	return newes && newes.url ? (
		<StoryWrapper data-testid="story">
			<Fragment>
				<StoryTitle>
					<a href={`${newes.url}`}>{newes.title}</a>
				</StoryTitle>
				<StoryMeta>
					<span data-testid="story-by">
						<StoryMetaElement color="#000">By:</StoryMetaElement> {newes.by}
					</span>
					<span data-testid="story-time">
						<StoryMetaElement color="#000">Posted:</StoryMetaElement> {mapTime(newes.time)}
					</span>{" "}
					<span data-testid="story-comment">
						<StoryMetaElement color="#000">Comment:</StoryMetaElement> {`${newes.kids ? newes.kids.length : 0}`}
					</span>{" "}
					<span data-testid="story-comment">
						<StoryMetaElement color="#000">Upvotes:</StoryMetaElement> {`${newes.score ? newes.score : 0}`}
					</span>{" "}
					<ButtonElement onClick={() => deleteAction(newes.id)}>Delete</ButtonElement>
				</StoryMeta>
			</Fragment>
		</StoryWrapper>
	) : null;
};
