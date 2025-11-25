import 'server-only'

import { cache } from "react";
import { createBackClient } from '@/utils/supabase/server';

export const verifySession = cache(async () => {
    const supabase = await createBackClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    return {
        isAuth: true,
        userId: user.id,
    }
})