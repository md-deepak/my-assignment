import React, { useEffect, Fragment, useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { NewsListComponent } from "../components/News"; // import news list component
import { GlobalStyle, StoriesContainerWrapper } from "../styles/StoriesContainerStyles"; // import style component
const NewsContainer = ({ newsReducer: { loading, newsList, newsIdStatus }, fetchNewsIds }) => {
	const [posts, setPosts] = useState([]); // news list state
	const [deleteNews, setDeleteNews] = useState([]); // delete news list array state
	const [deleteActive, setDeleteActive] = useState(false); // delete flag boolean
	useEffect(() => {
		fetchNewsIds(); // fetch newsList
	}, [fetchNewsIds]);
	useEffect(() => {
		if (newsIdStatus) {
			setPosts(newsList);
		}
	}, [newsIdStatus, newsList]);

	useEffect(() => {
		if (deleteActive) {
			setPosts(newsList.filter((word) => !deleteNews.includes(word.id)));
			setDeleteActive(false);
		}
	}, [deleteActive, deleteNews, newsList]);

	const handleDelete = (id) => {
		setDeleteNews((deleteNews) => [...deleteNews, id]);
		setDeleteActive(true);
	};
	return (
		<Fragment>
			<GlobalStyle />
			<StoriesContainerWrapper data-test-id="stories-container">
				<h1>News List</h1>
				{loading ? (
					<Loader type="Puff" color="#00BFFF" height={100} width={100} />
				) : (
					<Fragment>
						{_.map(posts, (story, i) => (
							<NewsListComponent key={i} newes={story} deleteAction={handleDelete} />
						))}
					</Fragment>
				)}
			</StoriesContainerWrapper>
		</Fragment>
	);
};

const mapStateToProps = ({ newsReducer }) => {
	return { newsReducer };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchNewsIds: () => dispatch({ type: "@FETCH_NEWS_ID" }),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
