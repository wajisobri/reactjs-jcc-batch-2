import React from "react";
import { JobCard } from "../../components/landing/JobCard";
import { LandingFilter } from "../../components/landing/LandingFilter";
import { LandingLayout } from "../../components/landing/LandingLayout";
import { LandingSearch } from "../../components/landing/LandingSearch";

export const JobVacancy = () => {  
	return (
		<LandingLayout>
			<div className="w-full bg-gray-800 py-32 px-4 md:px-10">
				<LandingSearch />
			</div>
			<div className="w-full bg-white my-10 md:my-12 p-6 md:p-8 lg:p-12">
				<LandingFilter />
				<JobCard />
			</div>
		</LandingLayout>
	);
};
