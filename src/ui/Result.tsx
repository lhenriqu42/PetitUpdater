import { Box, Typography } from "@mui/material";

export const Result: React.FC<{ gitLog: LogResult, title: string }> = ({ gitLog, title }) => {
	return (
		<Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3} height={250}>
			<Typography variant="h4">
				{title}
			</Typography>
			<Box>
				<Typography>
					{gitLog.total === 0 ?
						`Ultima atualização: `
						:
						`${gitLog.total} Atualizações Disponíveis!`
					}
				</Typography>
				<Box>

				</Box>
			</Box>
		</Box>
	);
};